type AuthHeaderProps = {
  label: string;
  title: string;
};

const AuthHeader = ({ label, title }: AuthHeaderProps) => {
  return (
    <div className="w-full flex gap-y-4 flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">{label}</h1>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  );
};

export default AuthHeader;
