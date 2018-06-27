## 基于Vue和Moment的时间选择器组件

### 插件版本
vue@2.5.16  
moment@2.22.2
  
**[提示]** 该时间选择器组件为Vue类型组件，除了需要安装Vue插件外，还需要安装Moment插件，安装命令如下：  

    npm i -D moment

### 父组件中使用
**带参数**

    <TimePicker :params="timePickerOPT" @emit-info="showInfo"></TimePicker>
    
**不带参数**

    <TimePicker @emit-info="showInfo"></TimePicker>  

**注册组件**

    export default {
        //省略其他选项

        components: {
            TimePicker
        }
        //省略其他选项
    }

### 配置参数

| 参数 | 说明 |  
| ---- | ---- |  
| startTime | 设置时间选择器的开始时间 |
| endTime | 设置时间选择器的结束时间 |  

**使用方法**  

    export default {
        //省略其他选项
        data: function () {
            return {
                info: '',
                timePickerOPT: {
                    startTime: "2018-04",
                    endTime: "2018-12"
                }
            }
        }
        //省略其他选项
    }
    
### 获取选择时间

    export default {
        //省略其他选项
        methods: {
            showInfo (info) {
                this.info = info;
            }
        }
        //省略其他选项
    }
    
### 注意事项
* 如果不带起止时间参数则默认可以选择所有时间
* 起止时间参数格式为`YYYY-MM-DD`或`YYYY-MM`，格式错误则认为没有参数
* 如果起始时间大于截止时间则认为没有参数
* 如果只有起始时间则可以选择起始时间之后的所有时间
* 如果只有截止时间则可以选择截止时间之前的所有时间
* 如果起止时间不包含今天则不会显示`今天`按钮
* 如果起始时间格式为`YYYY-MM`，则默认从该月1号开始
* 如果截止时间格式为`YYYY-MM`，则默认到该月最后一天截止