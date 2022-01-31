import React from "react";
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DemandTable from "./components/DemandTable";
export default function ViewDemandPage() {
    return(
        <Container>
            <Box mt={8}>
                <Typography variant={"h2"} >
                    Demands of Vegetables
                </Typography>
                <Box mt={5}>
                    <Paper>
                       <DemandTable/>
                    </Paper>
                </Box>
            </Box>
        </Container>
    )
}