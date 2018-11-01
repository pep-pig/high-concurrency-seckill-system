package org.seckill.exception;

/**
 * 重复秒杀异常（运行期异常）
 * Created by dsh13 on 2016/9/19.
 */
public class RepeteKillException extends SeckillException {

    public RepeteKillException(String message) {
        super(message);
    }

    public RepeteKillException(String message, Throwable cause) {
        super(message, cause);
    }
}
