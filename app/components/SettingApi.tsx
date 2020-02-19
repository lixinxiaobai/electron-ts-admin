import * as React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { observer } from 'mobx-react';
import { observable, reaction, IReactionDisposer } from 'mobx';
import * as _ from "lodash";
import storage from '@/utils/storage';
import { STORE_KEY_APIURL } from '@/config/constans';

interface SettingApiProps extends FormComponentProps{
    visible: boolean;
    close: () => void | undefined;
}

@observer
class SettingApi extends React.Component<SettingApiProps>{

    reaction:IReactionDisposer|undefined;

    @observable loading:boolean = false;

    componentDidMount(){
        this.reaction = reaction(
            () => this.props.visible, 
            () => {
                if(storage.get(STORE_KEY_APIURL)){
                    this.props.form.setFieldsValue({
                        apiurl:storage.get(STORE_KEY_APIURL) || ""
                    })
                }
            }
        )
    }

    componentWillUnmount(){
        this.reaction && this.reaction();
    }

    onSubmit = () => {
        const { form } = this.props;
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                this.loading = true;
                storage.set(STORE_KEY_APIURL, values['apiurl'])
                this.loading = false;
                this.props.close();
                message.success("设置成功");
            }
        })
    }

    render() {
        return <Modal
            visible={this.props.visible}
            confirmLoading={this.loading}
            onCancel={() => this.props.close()}
            onOk={this.onSubmit}
            title="设置服务器API"
        >
            <Form>
                <Form.Item>
                    {this.props.form.getFieldDecorator('apiurl', {
                        rules: [
                            {
                                required: true,
                                message: "必须设置服务器ip"
                            },
                        ],
                        initialValue:storage.get(STORE_KEY_APIURL)
                    })(
                        <Input
                            addonBefore="Http://"
                            placeholder="请输入"
                        />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    }
}

export default Form.create<SettingApiProps>()(SettingApi);