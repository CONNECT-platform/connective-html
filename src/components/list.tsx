import { RendererLike } from '../renderer/renderer-like';
import { CompType } from '../renderer/plugin/component/types';

import { SimpleList, SimpleListProps } from './simple-list';
import { KeyedList, KeyedListProps, KeyedListPropsWithKey, KeyedListPropsWithoutKey } from './keyed-list';
import { KeyedDeep } from '@connectv/core';


export type ListProps = SimpleListProps | KeyedListProps;


function _isKeyedListPropWithKey(props: ListProps): props is KeyedListPropsWithKey {
  return (props as any).key;
}

function _isKeyedListPropWithoutKey(props: ListProps): props is KeyedListPropsWithoutKey {
  return props.of instanceof KeyedDeep;
}

export function List(props: ListProps, renderer: RendererLike<any, any | CompType>) {
  if (_isKeyedListPropWithKey(props))
    return <KeyedList of={props.of} each={props.each} key={props.key}/>;
  else if (_isKeyedListPropWithoutKey(props))
    return <KeyedList of={props.of} each={props.each}/>;
  else
    return <SimpleList of={props.of} each={props.each}/>;
}
