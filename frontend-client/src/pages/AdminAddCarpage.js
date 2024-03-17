import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Select, Upload } from "antd";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import Error from "../components/Error";

const { Option } = Select;

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/location/getalllocations");
        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const onFinish = async (values) => {
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("makeModel", values.makeModel);
      formData.append("carGroup", values.carGroup);
      formData.append("acriss", values.acriss);
      formData.append("priceAmount", values.priceAmount);
      formData.append("batteryType", values.batteryType);
      formData.append("locationId", values.locationId);

      values.imageURLs.forEach((file) => {
        formData.append("imageFiles", file.originFileObj);
      });

      const response = await axios.post("/api/car/addcar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-TOKEN": getCSRFToken(),
        },
      });

      Swal.fire("Congratulations", "Your Car Added Successfully", "success");
      form.resetFields();
    } catch (error) {
      console.error("Add Car Error:", error);
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

  const getCSRFToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.content : "";
  };

  return (
    <div className="row">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={error} />
      ) : (
        <div className="col-md-12">
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
              name="makeModel"
              label="makeModel"
              rules={[
                {
                  required: true,
                  message: "Please input the Make Model",
                },
                {
                  pattern: /^[A-Za-z ]*$/,
                  message: "Please enter only letters and spaces",
                },
                {
                  max: 25,
                  message: "Make Model should not exceed 25 characters",
                },
              ]}
            >
              <Input maxLength={25} />
            </Form.Item>
            <Form.Item
              name="carGroup"
              label="carGroup"
              rules={[
                {
                  required: true,
                  message: "Please input the Car Group",
                },
                {
                  pattern: /^[A-Za-z]\d{2}$/,
                  message: "Car Group should start with an alpha followed by two numbers",
                },
              ]}
            >
              <Input maxLength={3} />
            </Form.Item>
            <Form.Item
              name="acriss"
              label="acriss"
              rules={[
                {
                  required: true,
                  message: "Please input the ACRISS",
                },
                {
                  pattern: /^[A-Za-z]{4}$/,
                  message: "ACRISS should be 4 alpha characters",
                },
              ]}
            >
              <Input maxLength={4} />
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
              name="locationId"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please select a location",
                },
              ]}
            >
              <Select placeholder="Select a Location" allowClear>
                {locations.map((location) => (
                  <Option key={location._id} value={location._id}>
                    {location.name}
                  </Option>
                ))}
              </Select>
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
                  message: "Please select a Battery Type",
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


