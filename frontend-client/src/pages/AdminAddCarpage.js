import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select } from "antd";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import Error from "../components/Error";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function AdminAddCarpage() {
  const { Option } = Select;
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    setError("");
    setLoading(true);
    try {
      const data = (await axios.post("/api/car/addcar", values)).data;
      Swal.fire("Congratulations", "Your Car Added Successfully", "success");
      form.resetFields();
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }

    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="row">
      {loading ? (
        <Loading></Loading>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
          >
            <Form.Item
              name="makeModel"
              label="makeModel"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="carGroup"
              label="carGroup"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="acriss"
              label="acriss"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="priceAmount"
              label="priceAmount"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>
            <Form.Item
              name="imageURL1"
              label="imageURL1"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imageURL2"
              label="imageURL2"
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imageURL3"
              label="imageURL3"
              rules={[
                {
                  //required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="batteryType"
              label="batteryType"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a Battery Type" allowClear>
                <Option value="full electric">full electric</Option>
                <Option value="hybrid">hybrid</Option>
                <Option value="plug-in-hybrid">plug-in-hybrid</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="success" htmlType="submit">
                Add
              </Button>
              <Button type="danger" htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default AdminAddCarpage;
