import React, { useState } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select, Upload } from "antd";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Form Values:", values);
  
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("makeModel", values.makeModel);
      formData.append("carGroup", values.carGroup);
      formData.append("acriss", values.acriss);
      formData.append("priceAmount", values.priceAmount);
      formData.append("batteryType", values.batteryType);
      values.imageURLs.forEach((file) => {
        formData.append("imageFiles", file.originFileObj);
      });
  
      const response = await axios.post("/api/car/addcar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Response Data:", response.data);
      Swal.fire("Congratulations", "Your Car Added Successfully", "success");
      form.resetFields();
    } catch (error) {
      console.error("Add Car Error:", error);
      console.log("Error Response:", error.response); // Log the error response
      setError(error.message || "An error occurred");
      Swal.fire("Oops", "Error: " + error.message, "error");
    }
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
                  message: "Please input the Make Model",
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
                  message: "Please input the Car Group",
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
                  message: "Please input the ACRISS",
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
                  message: "Please input the Price Amount",
                },
              ]}
            >
              <InputNumber min={1} defaultChecked={1} />
            </Form.Item>

            <Form.Item
              name="imageURLs"
              label="Image URLs"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please upload at least one image",
                },
                {
                  validator: (_, fileList) => {
                    if (fileList.length > 3) {
                      return Promise.reject("No more than 3 images");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                accept="image/*"
                listType="picture-card"
                maxCount={3}
                beforeUpload={() => false}
              >
                <Button>Upload Image</Button>
              </Upload>
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
            <Button type="primary" htmlType="submit">
                Add
              </Button>
              <Button htmlType="button" onClick={onReset}>
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
