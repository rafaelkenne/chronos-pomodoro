import styles from './styles.module.css';

type DeafultInputProps = {
  //type: 'text' | 'number' | 'search';
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ id, type, labelText, ...rest }: DeafultInputProps) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      {/* {labelText ? <label htmlFor={id}>{labelText}</label> : ''} */}
      <input className={styles.input} id={id} type={type} {...rest} disabled />
    </>
  );
}
