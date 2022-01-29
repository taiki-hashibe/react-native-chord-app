import React from 'react';
import renderer from 'react-test-renderer';

import {Strings, Fret} from "../../src/Strings";

describe('<Strings />', () => {
  it('<Fret />', () => {
    const tree = renderer.create(<Fret turning={1} fretNumber={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('<String />', () => {
    const tree = renderer.create(<Fret turning={1} fretNumber={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});