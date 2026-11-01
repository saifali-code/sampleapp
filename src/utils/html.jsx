/* Render trusted HTML snippets (our own copy) inside JSX. */
export function Html({ as: Tag = "span", html, className, ...rest }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
export default Html;
