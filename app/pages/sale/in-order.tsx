import * as React from 'react';
import LineUp from './components/LineUp';
import { Card, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { inject, observer } from 'mobx-react';
import { RootStore } from '@/stores';
import CustomerStore from '@/stores/Customer';
import * as ffi from "ffi";
// console.log(ffi)
// import IcCard from '@/hardware/iccard';

interface InOrderProps extends FormComponentProps{
    Customer:CustomerStore
}
 
@observer
class InOrder extends React.Component<InOrderProps> {

    // iccard:IcCard;

    constructor(props:any){
        super(props);
        // this.iccard = new IcCard({Nkey:'FFFFFFFFFFFF'});
    }

    componentDidMount(){
       console.log(ffi);
      console.log(__filename);
        this.props.Customer.setCustomerList();
        console.log(Buffer.from([0,1,2]));
    }

    read = () => {
        try{
            // console.log(this.iccard.readCardData());
            // return;
            // let cardNo = this.iccard.readCardNumber();
            // console.log(cardNo);
        }catch(e){
            message.error(e.toString())
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
             span:3
            },
            wrapperCol: {
              span:21
            }
          };
        return <div>
            <LineUp />
            <Card
                title={<span style={{ color: "#409EFF", fontSize: 20, fontWeight: "bold" }}>入厂登记</span>}
                extra={<span style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>地磅读数：33.5吨</span>}
                style={{ marginTop: 15 }}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="车牌号">
                        <Row gutter={15}>
                            <Col span={6}>
                                {this.props.form.getFieldDecorator("plate_number", {
                                    rules: [{ required: true, message: '车牌号不能为空' }]
                                })(
                                    <Input placeholder="请输入车牌号" />
                                )}
                            </Col>
                            <Col span={18}>
                                <Button onClick={() => this.read()}>识别车牌号</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="选择客户">
                        <Row gutter={15}>
                            <Col span={6}>
                                {this.props.form.getFieldDecorator("customer_id", {
                                    rules: [{ required: true, message: '客户不能为空' }]
                                })(
                                    <Select placeholder="请选择客户">
                                        {this.props.Customer.AllCustomerList.map(item => {
                                            return <Select.Option key={item.id}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </Col>
                            <Col span={18}>
                                <Button>刷卡选择客户</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    }
}

export default Form.create()(
    inject<RootStore, any, any, any>(stores => ({
        Customer: stores.Customer
    }))(InOrder)); 