/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component, createRef } from 'react';
import { processColor, StyleSheet, View } from 'react-native';

import NativeLinearGradient, { type Props } from './common';

const convertPoint = (name, point) => {
  if (Array.isArray(point)) {
    console.warn(
      `LinearGradient '${name}' property should be an object with fields 'x' and 'y', ` +
      'Array type is deprecated.'
    );

    return {
      x: point[0],
      y: point[1]
    };
  }
  return point;
};

export default class LinearGradient extends Component<Props> {
  props: Props;
  gradientRef = createRef<NativeLinearGradient>();

  static defaultProps = {
    start: { x: 0.5, y: 0.0 },
    end: { x: 0.5, y: 1.0 },
  };

  setNativeProps(props: Props) {
    this.gradientRef.current.setNativeProps(props);
  }

  render() {
    const {
      children,
      colors,
      end,
      locations,
      useAngle,
      angleCenter,
      angle,
      start,
      style,
      ...otherProps
    } = this.props;

    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    const flatStyle = StyleSheet.flatten(style) || {};

    let borderRadiusStyles = {};
    // for (const [key, value] of Object.entries(flatStyle)) {
    //   if(key.startsWith('border')) {
    //     borderRadiusStyles[key] = value;
    //   }
    // }
    if (flatStyle.borderTopRightRadius) {
      borderRadiusStyles.borderTopRightRadius = flatStyle.borderTopRightRadius;
    }
    if (flatStyle.borderTopLeftRadius) {
      borderRadiusStyles.borderTopLeftRadius = flatStyle.borderTopLeftRadius;
    }
    if (flatStyle.borderBottomRightRadius) {
      borderRadiusStyles.borderBottomRightRadius = flatStyle.borderBottomRightRadius;
    }
    if (flatStyle.borderBottomLeftRadius) {
      borderRadiusStyles.borderBottomLeftRadius = flatStyle.borderBottomLeftRadius;
    }
    if (flatStyle.borderRadius) {
      borderRadiusStyles.borderRadius = flatStyle.borderRadius;
    }

    return (
      <View ref={this.gradientRef} {...otherProps} style={style}>
        <NativeLinearGradient
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, ...borderRadiusStyles}}
          colors={colors.map(processColor)}
          startPoint={convertPoint('start', start)}
          endPoint={convertPoint('end', end)}
          useAngle={useAngle}
          angleCenter={convertPoint('angleCenter', angleCenter)}
          angle={angle}
        />
        {children}
      </View>
    );
  }
}
