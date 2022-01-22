import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MultiActionAreaCard from "./card";
import ChemistryFull from "../images/chemistryfull.jpg";
import PhysicsFull from "../images/physicsfull.jpg";
import BiologyFull from "../images/biologyfull.jpg";
export default function CustomGrid() {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Item>
              {" "}
              <MultiActionAreaCard
                link="/test/biology"
                image={BiologyFull}
                subject="Biology"
              />{" "}
            </Item>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Item>
              <MultiActionAreaCard
                link="/test/physics"
                image={PhysicsFull}
                subject="Physics"
              />
            </Item>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Item>
              <MultiActionAreaCard
                link="/test/chemistry"
                image={ChemistryFull}
                subject="Chemistry"
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
