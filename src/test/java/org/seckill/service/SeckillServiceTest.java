package org.seckill.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.seckill.dto.Exposer;
import org.seckill.dto.SeckillExecution;
import org.seckill.entity.Seckill;
import org.seckill.exception.RepeteKillException;
import org.seckill.exception.SeckillCloseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * Created by dsh13 on 2016/9/19.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "classpath:spring/spring-dao.xml",
        "classpath:spring/spring-service.xml"
})
public class SeckillServiceTest {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SeckillService seckillService;

    @Test
    public void testGetSeckillList() throws Exception {
        List<Seckill> list = seckillService.getSeckillList();
        logger.info("list={}", list);
    }

    @Test
    public void testGetById() throws Exception {
        long id = 1000L;
        Seckill seckill = seckillService.getById(id);
        logger.info("seckill={}");
    }

//    @Test
//    public void testExportSeckillUrl() throws Exception {
//        long id = 1000L;
//        Exposer exposer = seckillService.exportSeckillUrl(id);
//        logger.info("exposer: " + exposer);
//        //exposer: Exposer{
//        // exposed=true,
//        // md5='79a2e0d328a4a2ac9b8a96cdc6674787',
//        // seckillId=1000,
//        // now=0,
//        // start=0,
//        // end=0
//        // }
//    }

//    @Test
//    public void testExcuteSeckill() throws Exception {
//        long id = 1000L;
//        long phoneNumber = 13574235323L;
//        String md5 = "79a2e0d328a4a2ac9b8a96cdc6674787";
//
//        try {
//            SeckillExecution seckillExecution = seckillService.excuteSeckill(id, phoneNumber, md5);
//            logger.info("seckillExecution:" + seckillExecution);
//        } catch (SeckillCloseException e) {
//            logger.error(e.getMessage());
//        } catch (RepeteKillException e) {
//            logger.error(e.getMessage());
//        }
//
//        //seckillExecution:SeckillExecution{
//        // seckillId=1000,
//        // state=1,
//        // stateInfo='秒杀成功',
//        // successKilled=SuccessKilled{
//        // seckillId=1000,
//        // userPhone=13574235323,
//        // state=0,
//        // createTime=Mon Sep 19 18:44:16 CST 2016
//        // }
//        // }
//
//
//    }

    @Test
    public void testSeckillLogic() throws Exception {
        long id = 1003L;
        Exposer exposer = seckillService.exportSeckillUrl(id);
        if (exposer.isExposed()) {
            logger.info("exposer: " + exposer);
            long phoneNumber = 13574678323L;
            String md5 = exposer.getMd5();

            try {
                SeckillExecution seckillExecution = seckillService.excuteSeckill(id, phoneNumber, md5);
                logger.info("seckillExecution:" + seckillExecution);
            } catch (SeckillCloseException e) {
                logger.error(e.getMessage());
            } catch (RepeteKillException e) {
                logger.error(e.getMessage());
            }
        } else {
            //秒杀未开启
            logger.info("exposer: " + exposer);
        }
    }

    @Test
    public void testExecuteSeckillProcedure() {
        long seckillId = 1000L;
        long phone = 14343545434L;
        Exposer exposer = seckillService.exportSeckillUrl(seckillId);
        if (exposer.isExposed()) {
            String md5 = exposer.getMd5();
            SeckillExecution seckillExecution = seckillService.excuteSeckillProcedure(seckillId, phone, md5);
            logger.info(seckillExecution.getStateInfo());
        }
    }

}