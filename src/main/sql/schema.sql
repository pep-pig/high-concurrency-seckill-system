-- 数据库初始化脚本

CREATE DATABASE SECKILL;

use SECKILL;

CREATE TABLE seckill(
  `seckill_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
  `name` VARCHAR(120) NOT NULL COMMENT '商品名称',
  `number` INT NOT NULL COMMENT '库存数量',
  `start_time` TIMESTAMP NOT NULL COMMENT '秒杀开始时间',
  `end_time` TIMESTAMP NOT NULL COMMENT '秒杀结束时间',
  `create_time` TIMESTAMP NOT NULL DEFAULT current_timestamp COMMENT '创建时间',
  PRIMARY KEY (seckill_id),
  KEY idx_start_time(start_time),
  KEY idx_end_time(end_time),
  KEY idx_create_time(create_time)
)ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT '秒杀库存';

INSERT into
  seckill(name, number, start_time, end_time)
values
('1000元秒杀iphone7', '100', '2016-09-18 00:00:00', '2016-09-28 00:00:00'),
('500元秒杀ipad2', '200', '2016-09-18 00:00:00', '2016-09-28 00:00:00'),
('300元秒杀小米4', '300', '2016-09-18 00:00:00', '2016-09-28 00:00:00'),
('200元秒杀红米note', '400', '2016-09-18 00:00:00', '2016-09-28 00:00:00');


-- 秒杀成功明细表
-- 用户登录认证相关的信息
CREATE TABLE success_killed(
  `seckill_id` BIGINT NOT NULL COMMENT '秒杀商品id',
  `user_phone` BIGINT NOT NULL COMMENT '用户手机号',
  `state` TINYINT NOT NULL DEFAULT -1 COMMENT '状态标识：-1无效，0成功，1已付款',
  `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
  PRIMARY KEY (seckill_id, user_phone),
  KEY idx_create_time(create_time)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT '秒杀成功明细表';

--修改秒杀时间
update seckill set start_time = '2018-10-01 00:00:00',end_time= '2019-10-07 00:00:00' where seckill_id=1000;
update seckill set start_time = '2018-10-01 00:00:00',end_time= '2019-10-15 00:00:00' where seckill_id=1001;
update seckill set start_time = '2018-10-15 00:00:00',end_time= '2018-10-25 00:00:00' where seckill_id=1002;
update seckill set start_time = '2019-10-01 00:00:00',end_time= '2019-10-15 00:00:00' where seckill_id=1003;
