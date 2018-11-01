package org.seckill.dao;

import org.apache.ibatis.annotations.Param;
import org.seckill.entity.SuccessKilled;

/**
 * Created by dsh13 on 2016/9/18.
 */
public interface SuccessKilledDao {

    /**
     * 插入购买明细，可以过滤重复
     *
     * @param seckillId
     * @param userPhone
     * @return 插入的行数
     */
    //返回值是该操作影响的行数，即成功了返回1，失败了返回0，因为再mybatis的xml文件中
    //使用了ignore,失败便会返回0
    int insertSuccessKilled(@Param("seckillId") long seckillId, @Param("userPhone") long userPhone);


    /**
     * 根据ID查询SuccessKilled并携带秒杀产品对象实体
     *
     * @param seckillId
     * @param userPhone
     * @return
     */
    SuccessKilled queryByIdWithSeckill(@Param("seckillId") long seckillId, @Param("userPhone") long userPhone);
}
