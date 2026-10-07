import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";

import { StaffCardProps } from "../types";

const StaffCard = ({
  name,
  title,
  image,
  institution,
  type,
}: StaffCardProps) => {
  if (type === "leader") {
    return (
      <Grid container spacing={2} justifyContent={"center"} sx={{ mb: 2 }}>
        <Grid size={{xs: 7, sm: 6, md:5}}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: "50%",
              bgcolor: "primary.light",
            }}
          >
            <Box sx={{ position: "relative", aspectRatio: 1 }}>
              <Image
                src={image}
                alt={name}
                fill={true}
                style={{
                  borderRadius: "1rem",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid sx={{ pl: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ m: "auto" }}>
            <Typography variant={"h5"} color={"primary.dark"}>
              {name}
            </Typography>
            <Typography variant={"body1"}>{title}</Typography>
            <Typography variant={"body1"}>{institution}</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  } else if (type === "staff") {
    return (
      <Box
        sx={{
          borderRadius: "1rem",
          padding: "1rem",
          backgroundColor: "white",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Paper
          sx={{
            padding: 1,
            borderRadius: "1rem",
            bgcolor: "primary.light",
          }}
        >
          <Image
            src={image}
            alt={name}
            height={150}
            width={150}
            style={{
              borderRadius: "1rem",
              objectFit: "cover",
            }}
          />
        </Paper>

        <Box sx={{ pl: 1, display: "flex", flexDirection: "column" }}>
          <Box sx={{ m: "auto" }}>
            <Typography variant={"h5"} color={"primary.dark"}>
              {name}
            </Typography>
            <Typography variant={"subtitle1"}>{title}</Typography>
            <Typography variant={"subtitle1"} lineHeight={1.4}>
              {institution}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  } else {
    throw new Error("Invalid type");
  }
};

export default StaffCard;
