import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import { Box, Typography, styled } from "@mui/material";

type Props = {
  level: string;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
};

const StyledBatteryIcon = styled("div")(() => ({
  width: 50,
  height: 50,
  transform: "rotate(90deg)",
}));

export default function Battery({
  level,
  charging,
  chargingTime,
  dischargingTime,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexBasis: 1,
        alignItems: "center",
      }}
    >
      {level === "100" ? (
        <StyledBatteryIcon as={BatteryFullIcon} />
      ) : (
        <>
          <StyledBatteryIcon as={BatteryChargingFullIcon} />
          {charging ? (
            <Typography color="GrayText">
              {chargingTime ? chargingTime === 0 : null}
            </Typography>
          ) : (
            <Typography>{dischargingTime}</Typography>
          )}
        </>
      )}
      <Typography fontSize={12} color="whitesmoke">
        {level}
      </Typography>
    </Box>
  );
}
