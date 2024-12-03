import { Editor } from "@monaco-editor/react";
import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { SearchArduinoCom } from "./code-templates/SearchArduinoCom";
import { DefaultArduinoCode } from "./code-templates/DefaultArduinoCode";
import { BotSendCode } from "./code-templates/BotSendCode";
import { FormattedMessage } from "react-intl";

export default function InstructionsTab() {
  return (
    <div>
      <Accordion defaultActiveKey="0">
        {/* Edit Buttons Section */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FormattedMessage
              id="dashboard.instructions_title_0"
            />
          </Accordion.Header>
          <Accordion.Body>
            <p>
              <FormattedMessage
                id="dashboard.instructions_body_0"
              />
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FormattedMessage
              id="dashboard.instructions_title_1"
            />
          </Accordion.Header>
          <Accordion.Body>
            <p>
            <FormattedMessage
                id="dashboard.instructions_body_1"
              />
            </p>
            <Editor
              height="30vh"
              defaultLanguage="python"
              defaultValue={SearchArduinoCom}
              options={{
                readOnly: true,
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FormattedMessage
              id="dashboard.instructions_title_2"
            />
          </Accordion.Header>
          <Accordion.Body>
            <p>
            <FormattedMessage
                id="dashboard.instructions_body_2"
              />
            </p>
            <Editor
              height="60vh"
              defaultLanguage="python"
              defaultValue={BotSendCode}
              options={{
                readOnly: true,
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FormattedMessage
              id="dashboard.instructions_title_3"
              defaultMessage="C++ Arduino JSON Data"
            />
          </Accordion.Header>
          <Accordion.Body>
            <p>
            <FormattedMessage
                id="dashboard.instructions_body_3"
              />
            </p>
            <Editor
              height="40vh"
              defaultLanguage="cpp"
              defaultValue={DefaultArduinoCode}
              options={{
                readOnly: true,
              }}
            />
            {/* Include your C++ code here */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
