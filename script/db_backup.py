import os
import sys
import subprocess
script_path = os.getcwd()
root_path = os.path.dirname(script_path)
back_path = os.path.join(root_path,'backup')

os.chdir(r'D:\Program Files\PostgreSQL\10\bin')

jj = subprocess.Popen('pg_dump -U postgres xuncha > %(sql_path)s '%({'sql_path':os.path.join(back_path,'xuncha.sql')}),shell=True)
jj.wait() 
