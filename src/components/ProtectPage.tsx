import { withAuthenticationRequired } from "@auth0/auth0-react";

type Props = {
  component: React.ComponentType;
};

function ProtectPage({ component }: Props) {
  const Auth = withAuthenticationRequired(component);
  return <Auth />;
}

export default ProtectPage;
