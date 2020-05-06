import React, {Component} from 'react';
// import ecahrts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import { Card} from "antd";

export default class Pie extends Component {

    state = {
        books: [1000, 1450, 500, 1780, 1080, 700],        // 订单量
        sales: [700, 1300, 300, 1600, 1000, 650]         // 销量
    }

    getOption1 = () => {
        let options = {
            title: {
                text: '扇形图-1',
                textStyle: {
                    color: '#F56C6C'
                },
            },
            tooltip: {               // 提示信息
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {                // 图例组件
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',],
                icon: 'circle',
                orient: 'vertical',
                left: 20,
                top: 50
            },
            series: [              // 数据源
                {
                    name: '存货',   // {a}
                    type: 'pie',
                    data: [
                        {
                            name: '周一',     // {b}
                            value: 1000      // {c}
                        },
                        {name: '周二', value: 2000},
                        {name: '周三', value: 1500},
                        {name: '周四', value: 1300},
                        {name: '周五', value: 777},
                        {name: '周六', value: 1123},
                        {name: '周日', value: 400},
                    ]
                }
            ],
        }
        return options
    }

    getOption2 = () => {
        let options = {
            title: {
                text: '扇形图-2',
                textStyle: {
                    color: '#F56C6C'
                },
            },
            tooltip: {               // 提示信息
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {                // 图例组件
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',],
                icon: 'circle',
                orient: 'vertical',
                left: 20,
                top: 50
            },
            series: [              // 数据源
                {
                    name: '存货',   // {a}
                    type: 'pie',
                    radius: ['50%', '80%'],           // 配置为圆环
                    data: [
                        {
                            name: '周一',     // {b}
                            value: 1000      // {c}
                        },
                        {name: '周二', value: 2000},
                        {name: '周三', value: 1500},
                        {name: '周四', value: 1300},
                        {name: '周五', value: 777},
                        {name: '周六', value: 1123},
                        {name: '周日', value: 400},
                    ]
                }
            ],
        }
        return options
    }

    getOption3 = () => {
        let options = {
            title: {
                text: '扇形图-3',
                textStyle: {
                    color: '#F56C6C'
                },
            },
            tooltip: {               // 提示信息
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {                // 图例组件
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',],
                icon: 'circle',
                orient: 'vertical',
                left: 20,
                top: 50
            },
            series: [              // 数据源
                {
                    name: '存货',   // {a}
                    type: 'pie',
                    roseType: 'radius',
                    data: [
                        {
                            name: '周一',     // {b}
                            value: 1000      // {c}
                        },
                        {name: '周二', value: 2000},
                        {name: '周三', value: 1500},
                        {name: '周四', value: 1300},
                        {name: '周五', value: 777},
                        {name: '周六', value: 1123},
                        {name: '周日', value: 400},
                    ].sort((a,b)=>a.value-b.value)
                }
            ],
        }
        return options
    }

    render() {
        return (
            <div>
                <Card>
                    <ReactEcharts option={this.getOption1()}/>
                </Card>
                <Card>
                    <ReactEcharts option={this.getOption2()}/>
                </Card>
                <Card>
                    <ReactEcharts option={this.getOption3()}/>
                </Card>
            </div>
        );
    }
}

