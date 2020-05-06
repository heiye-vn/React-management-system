import React, {Component} from 'react';
// import ecahrts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import {Button, Card} from "antd";

export default  class Bar extends Component {

    state = {
        books:[1000,1450,500,1780,1080,700],        // 订单量
        sales:[700,1300,300,1600,1000,650]         // 销量
    }

    getOption1 = () =>{
        let options = {
            title:{
                text:'柱形图-1',
                textStyle:{
                    color:'#F56C6C'
                },
            },
            tooltip:{               // 提示信息
                trigger:'item'
            },
            legend:{               // 图例组件
                data:['存货'],
                // icon:'circle'

            },
            xAxis:{
                name:'日期',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                name:'数量'
            },
            series:[              // 数据源
                {
                    name:'存货',
                    type:'bar',
                    data:[1000,2000,1500,2000,1200,800]
                }
            ],
        }
        return options
    }

    getOption2 = (books,sales) =>{
        let options = {
            title:{
                text:'柱形图-2',
                textStyle:{
                    color:'#F56C6C'
                },
            },
            tooltip:{               // 提示信息
                trigger:'item'
            },
            legend:{               // 图例组件
                data:['订单量','销量'],
                icon:'circle'

            },
            xAxis:{
                name:'日期',
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                name:'数量'
            },
            series:[              // 数据源
                {
                    name:'订单量',
                    type:'bar',
                    data:books
                },
                {
                    name:'销量',
                    type:'bar',
                    data:sales
                }
            ],
        }
        return options
    }

    update = () =>{
        this.setState(state=>({
            books:state.books.map(item=>item+30),
            sales:state.sales.map(item=>item-10)
        }))
    }

    render() {
        const title = <Button type={'primary'} onClick={this.update}>更新数据</Button>
        const {books,sales} = this.state
        return (
            <div>
                <Card>
                    <ReactEcharts option={this.getOption1()} />
                </Card>
                <Card title={title}>
                    <ReactEcharts option={this.getOption2(books,sales)} />
                </Card>
            </div>
        );
    }
}

