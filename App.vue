<template>
    <div>
        <h3>时间选择器组件</h3>
        <div class="text-error">vue@2.5.16</div>
        <div class="text-error">moment@2.22.2</div>
        <div>vue-loader@15.2.4</div>
        <div>vue-style-loader@4.1.0</div>
        <div>vue-template-compiler@2.5.16</div>
        <div>webpack@4.12.0</div>
        <div>webpack-cli@3.0.6</div>
        <div>webpack-dev-server@3.1.4</div>
        <div>babel-loader@7.1.4</div>
        <div>babel-core@6.26.3</div>
        <div>babel-preset-env@1.7.0</div>
        <div>mini-css-extract-plugin@0.4.0</div><hr>

        <div class="accept-info">您选择的时间是：{{ info }}</div>
        <TimePicker :params="timePickerOPT" @emit-info="showInfo"></TimePicker>
    </div>
</template>

<script>
    import TimePicker from './component/Timepicker.vue';
    export default {
        name: 'App',
        data: function () {
            return {
                info: '',
                timePickerOPT: {
                    startTime: "2018-04",
                    endTime: "2018-12"
                }
            }
        },
        components: {
            TimePicker
        },
        methods: {
            showInfo (info) {
                this.info = info;
            }
        }
    }
</script>

<style>
    .accept-info {
        margin: 10px auto;
    }
    .text-error {
        color: red;
    }
</style>