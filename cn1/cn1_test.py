import numpy as np
while True:
    matrix = np.random.rand(100, 100)
    det = np.linalg.det(matrix)
    print(det)