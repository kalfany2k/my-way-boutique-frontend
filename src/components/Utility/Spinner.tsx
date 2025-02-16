interface Props {
  size: number;
}

const Spinner: React.FC<Props> = ({ size }) => {
  return (
    <div
      className={`animate-spin rounded-full border-r-2 border-t-2 border-rose-400`}
      style={{ width: size + "px", height: size + "px" }}
    />
  );
};

export default Spinner;
