import sqlite3
import pikepdf
from tqdm import tqdm
import subprocess
import sqlite3
from threading import Thread
import subprocess
import pikepdf
from tqdm import tqdm
import time

def decrypt(path):
    # load password list
    names = [ line.strip() for line in open("/share/cloud_mini/cn2/100names.txt") ]

    flag = False
    final_password = ""

    # iterate over passwords
    for name in tqdm(names, "Decrypting PDF"):
        for month in range(1,13):
            if month < 10:
                month = str(0) + str(month)
            for day in range(1,32):
                # open PDF file
                if day < 10:
                    day = str(0)+str(day)
                combinepw = name+str(month)+str(day)
                try:
                    with pikepdf.open(path, password=combinepw) as pdf:
                        # Password decrypted successfully, break out of the loop
                        final_password = combinepw
                        flag = True
                        return flag, final_password
                except:
                    # wrong password, just continue in the loop
                    continue

    return flag, final_password

def updateUsage():
    while True:
        cmd = "top -bn 1 -i -c"

        # 執行shell命令
        result = subprocess.run(cmd, stdout=subprocess.PIPE, shell=True)

        # 將命令輸出轉換為字串
        output = result.stdout.decode()

        # 從命令輸出中提取CPU和內存使用率
        lines = output.split('\n')
        cpu_usage = lines[2].split()[1]
        mem_usage = int(lines[3].split()[7]) / int(lines[3].split()[3])
        mem_usage = round(mem_usage, 8)

        # Connect to the database
        connection = sqlite3.connect('/share/cloud_mini/cloud_mini.db')
        # 創建一個遊標對象
        cursor = connection.cursor()

        # 執行一個SELECT查詢
        sql_usage = f"UPDATE `resource` SET `cpu`={cpu_usage}, `mem`={mem_usage} WHERE `node`='cn2'"
        cursor.execute(sql_usage)
        connection.commit()

        # 關閉遊標和連接
        cursor.close()
        connection.close()
        time.sleep(1)


def compute():
    while True:
        # Connect to the database
        connection = sqlite3.connect('/share/cloud_mini/cloud_mini.db')
        # 創建一個遊標對象
        cursor = connection.cursor()

        # 執行一個SELECT查詢
        sql = "SELECT * FROM schedule WHERE status = 'false' AND c2 = 'false' LIMIT 1"
        cursor.execute(sql)

        # 獲取第一行記錄
        record = cursor.fetchone()

        # 如果記錄存在，顯示它
        if record:
            print(record)
            timestamp = record[0]
            status = record[1]

            sql = f"UPDATE `schedule` SET `c2`='running' WHERE `timestamp`={timestamp}"
            print("c2 running")
            cursor.execute(sql)
            connection.commit()

            #print(f"timestamp: {timestamp}\nstatus: {status}")
            flag, password = decrypt(f'/share/cloud_mini/share/{str(timestamp).zfill(6)}.pdf')
            #print(f"flag: {flag}\npassword: {password}")

            if flag == False:
                print("No password found")
                sql = f"UPDATE `schedule` SET `c2`='true' WHERE `timestamp`={timestamp}"
                cursor.execute(sql)
            else:
                print(f"Password found: {password}")
                sql = f"UPDATE schedule SET status='{password}', c2='true' WHERE timestamp={timestamp}"
                print(sql)
                cursor.execute(sql)
            connection.commit()

        # 關閉遊標和連接
        cursor.close()
        connection.close()


if __name__ == '__main__':
    thread1 = Thread(target=updateUsage)
    thread2 = Thread(target=compute)

    thread1.start()
    thread2.start()

    thread1.join()
    thread2.join()
