+ 启动/停止服务

```
net start mysql
net stop mysql
```

+ 登录

```sql
mysql -uroot -p -P3306 -h127.0.0.1
```

+ 修改提示符

```
prompt \u@\h \d     //数据库@主机名 数据库
```

+ 创建数据库

``` sql
create database mydata;
```

+ 进入数据库

```sql
use mydata;
```

+ 创建表

```sql
mysql> create table dept
    -> (
    -> deptno int primary key,
    -> dname varchar(14),
    -> loc varchar(13)
    -> );
```

```sql
mysql> create table emp                            
    -> (                                           
    -> empno int primary key,                      
    -> ename varchar(10),                          
    -> job varchar(10),                            
    -> mgr int,                                    
    -> hiredate datetime,                          
    -> sal double,                                 
    -> comm double,                                
    -> deptno int,                                 
    -> foreign key (deptno) references dept(deptno)
    -> );                                          
```

+ 查看数据库

  ``` sql
  show databases;
  ```

+ 查看表

``` 
show tables;
```

+ 查看表结构

``` 
desc dept;
```

+ 插入表数据

``` 
insert into dept values (10, 'A', 'A');
commit;
```

