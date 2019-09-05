import renderer, {PropsType} from '../src/renderer';


let F = (props: PropsType) => <h1>{props.title}</h1>;
let x = <div>
  <span>{2}</span>
  {['hellow', 'world'].map(_ => <F title={_}/>)}
</div>;

renderer.render(x).on(document.body);