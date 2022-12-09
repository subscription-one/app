import React, {useEffect, useState} from 'react';
import Messages from './Messages';
import {getNodeId, isUiNodeInputAttributes} from '../../../helpers/form';
import {Node} from './Node';

export const SelfServiceFlow = ({flow, only, onSubmit, textInputOverride}) => {
  const [inProgress, setInProgress] = useState(false);
  const [values, setValues] = useState({});
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    if (!flow) {
      return;
    }
    const nodes = flow.ui.nodes.filter(({group}) => {
      if (only) {
        return group === only || group === 'default';
      }
      return true;
    });
    const values = {};
    nodes.forEach(node => {
      const name = getNodeId(node);
      const key = name;
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === 'button' ||
          node.attributes.type === 'submit'
        ) {
          // In order to mimic real HTML forms, we need to skip setting the value
          // for buttons as the button value will (in normal HTML forms) only trigger
          // if the user clicks it.
          return;
        }
        values[key] = node.attributes.value;
      }
    });
    setValues(values);
    setNodes(nodes);
  }, [flow]);
  if (!flow) {
    return null;
  }
  const onChange = name => value => {
    setValues(values =>
      Object.assign(Object.assign({}, values), {[name]: value}),
    );
  };
  const getValue = name => values[name];
  const onPress = (key, value) => {
    setInProgress(true);
    onSubmit(Object.assign(Object.assign({}, values), {[key]: value})).then(
      () => {
        setInProgress(false);
      },
    );
  };
  return (
    <>
      <Messages testID="form-messages" messages={flow.ui.messages} />
      {nodes.map((node, k) => {
        const name = getNodeId(node);
        return (
          <Node
            key={`form-field-${flow.ui.action || ''}-${name}-${k}`}
            textInputOverride={textInputOverride}
            disabled={inProgress}
            value={getValue(name)}
            onChange={onChange(name)}
            node={node}
            isSubmitting={inProgress}
            onSubmitPress={onPress}
          />
        );
      })}
    </>
  );
};
