import docker
import time
import sqlite3
import subprocess


client = docker.from_env()
containers = ['cn1', 'cn2', 'cn3']

while True:
    for container in containers:
        output = subprocess.check_output(['docker', 'stats', '--no-stream', container])
        output_list = output.decode().strip().split('\n')[1].split()
        cpu_percent = output_list[-2]
        mem_percent = output_list[-1]
        print(f'{container}: CPU={cpu_percent}, MEM={mem_percent}')

        # 連接資料庫
        connection = sqlite3.connect('/home/randy/Desktop/cloud_mini/cloud_mini/cloud_mini.db')
        cursor = connection.cursor()
        sql_usage = f"UPDATE `resource` SET `cpu`={cpu_percent}, `mem`={mem_percent} WHERE `node`='{container}'"
        cursor.execute(sql_usage)
        connection.commit()
        time.sleep(1)
