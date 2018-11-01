package org.seckill.exception;

/**
 * 秒杀关闭异常
 * Created by dsh13 on 2016/9/19.
 */
public class SeckillCloseException extends SeckillException {

    public SeckillCloseException(String message) {
        super(message);
    }

    public SeckillCloseException(String message, Throwable cause) {
        super(message, cause);
    }
}
