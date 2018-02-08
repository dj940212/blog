1.`sudo /usr/local/mysql/support-files/mysql.server stop`关闭mysql服务器

2.`cd /usr/local/mysql/bin` 进入目录

3.`sudo su` 获取权限

4.`./mysqld_safe --skip-grant-tables &`  重启服务器

5.重开个终端,输入下面命令

6.`/usr/local/mysql/bin/mysql` 进入mysql命令模式

7.`use mysql`进入mysql数据库

8.`flush privileges;`大概就是获取权限

9.`set password for 'root'@'localhost'=password('新密码'); `完成修改