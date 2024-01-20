
const SvgIcon = ({ name, fill = "none", ...props }) => (
  <svg fill={fill} {...props}>
    <use xlinkHref={`/sprites.svg#${name}`} />
  </svg>
);

export default SvgIcon;
