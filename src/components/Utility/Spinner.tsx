interface Props {
  size: number;
}

const Spinner: React.FC<Props> = ({ size }) => {
  return (
    <div
      className={`animate-spin rounded-full border-r-2 border-t-2 border-rose-400 w-${size} h-${size}`}
    />
  );
};

export default Spinner;
