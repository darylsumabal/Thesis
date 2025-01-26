import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type BackButtonHrefProps = {
  label: string;
  href: string;
};

const BackButtonHref = ({ label, href }: BackButtonHrefProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link to={href}> {label}</Link>
    </Button>
  );
};

export default BackButtonHref;
