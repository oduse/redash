import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Radio from "antd/lib/radio";
import DynamicComponent from "@/components/DynamicComponent";
import { SettingsEditorPropTypes, SettingsEditorDefaultProps } from "../prop-types";

export default function SAMLSettings(props) {
  const { values, onChange } = props;

  const onChangeEnabledStatus = e => {
    const updates = { auth_saml_enabled: !!e.target.value };
    if (e.target.value) {
      updates.auth_saml_type = e.target.value;
    }
    onChange(updates);
  };

  return (
    <DynamicComponent name="OrganizationSettings.SAMLSettings" {...props}>
      <h4>SAML</h4>
      <Form.Item label="SAML 启用">
        <Radio.Group
          onChange={onChangeEnabledStatus}
          value={values.auth_saml_enabled && (values.auth_saml_type || "dynamic")}>
          <Radio value={false}>不启用</Radio>
          <Radio value={"static"}>启用(静态)</Radio>
          <Radio value={"dynamic"}>启用(动态)</Radio>
        </Radio.Group>
      </Form.Item>
      {values.auth_saml_enabled && (
        <>
          {values.auth_saml_type === "static" && (
            <>
              <Form.Item label="SAML Single Sign-on URL">
                <Input
                  value={values.auth_saml_sso_url}
                  onChange={e => onChange({ auth_saml_sso_url: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="SAML Entity ID">
                <Input
                  value={values.auth_saml_entity_id}
                  onChange={e => onChange({ auth_saml_entity_id: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="SAML x509 cert">
                <Input
                  value={values.auth_saml_x509_cert}
                  onChange={e => onChange({ auth_saml_x509_cert: e.target.value })}
                />
              </Form.Item>
            </>
          )}
          {values.auth_saml_type === "dynamic" && (
            <>
              <Form.Item label="SAML Metadata URL">
                <Input
                  value={values.auth_saml_metadata_url}
                  onChange={e => onChange({ auth_saml_metadata_url: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="SAML Entity ID">
                <Input
                  value={values.auth_saml_entity_id}
                  onChange={e => onChange({ auth_saml_entity_id: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="SAML NameID Format">
                <Input
                  value={values.auth_saml_nameid_format}
                  onChange={e => onChange({ auth_saml_nameid_format: e.target.value })}
                />
              </Form.Item>
            </>
          )}
        </>
      )}
    </DynamicComponent>
  );
}

SAMLSettings.propTypes = SettingsEditorPropTypes;

SAMLSettings.defaultProps = SettingsEditorDefaultProps;
