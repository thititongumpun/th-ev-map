import { Card } from "@mui/material";
import { Skeleton } from "@mui/material";

interface Props {
  loading?: boolean;
}

export default function LoadingSkelation({ loading }: Props) {
  return (
    <Card>
      {loading && <Skeleton sx={{ height: 600 }} variant="rectangular" />}
    </Card>
  );
}
