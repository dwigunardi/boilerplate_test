import React from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
import { testSelector, themeState, validateAtom } from "@/store/Atom";
import { useRecoilState, useRecoilValue } from "recoil";
function Content() {
  const data = useRecoilValue(testSelector);
  const [stateTheme, setStateTheme] = useRecoilState(themeState);
  const [stateValidate, setStateValidate] = useRecoilState(validateAtom);
  const [selectorState, setSelectorState] = useRecoilState(testSelector);
  const currentTheme = stateTheme == "dark" ? "#000" : "#fff";
  const { Header, Footer, Sider, Content } = Layout;
  const contentStyle = {
    textAlign: "center",
    minHeight: "100vh",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#108ee9",
  };
  console.log(selectorState);
  return (
    <Content style={contentStyle}>
      <h1>Ini data dari Selector</h1>
      {stateValidate == "allow me" ? (
        <div>
          {" "}
          <Button
            title="log out"
            size="large"
            onClick={() => setStateValidate(null)}
          >
            LOGOUT
          </Button>
          {data.data.slice(0, 5).map((value, idx) => {
            return (
              <Row justify={"center"} align="middle" key={idx}>
                <Col>
                  <h1>{value.title}</h1>
                  <p>{value.body}</p>
                </Col>
              </Row>
            );
          })}
        </div>
      ) : (
        <Typography.Text
          editable={{
            onChange: (e) => setStateValidate(e),
          }}
        >
          {selectorState == null ? "You are not Allowed" : selectorState}
        </Typography.Text>
      )}
    </Content>
  );
}

export default Content;
