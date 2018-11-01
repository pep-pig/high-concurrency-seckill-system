package org.seckill.enums;

/**
 * 使用枚举表述常量数据字段
 * Created by dsh13 on 2016/9/19.
 */
public enum SeckillStateEnum {
    //都是该枚举类的实例，他将会调用SeckillStateEnum构造方法实例化
    SUCCESS(1, "秒杀成功"),
    END(0, "秒杀结束"),
    REPEAT_KILL(-1,"重复秒杀"),
    INNER_ERROR(-2,"系统异常"),
    DATA_REWRITE(-3,"数据篡改")
    ;

    private int state;

    private String stateInfo;

    //枚举类的构造方法
    SeckillStateEnum(int state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    //枚举类的成员方法
    public int getState() {
        return state;
    }

    public String getStateInfo() {
        return stateInfo;
    }

    //根据编号获取相应的枚举实例
    public static SeckillStateEnum stateOf(int index) {
        for (SeckillStateEnum state: values()) {
            if(state.getState() == index) {
                return state;
            }
        }
        return null;
    }
}
