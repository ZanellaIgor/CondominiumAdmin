import { Build, Event, Poll, Warning } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDashboard } from "@src/hooks/queries/useDashboard";
import { useAuth } from "@src/hooks/useAuth";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  count: number | undefined;
  icon: ReactNode;
  color: string;
}

const DashboardCard = ({
  title,
  count = 0,
  icon,
  color,
}: DashboardCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        backgroundColor: color,
        color: "white",
      }}
    >
      <Box sx={{ marginRight: 2 }}>{icon}</Box>
      <CardContent>
        <Typography variant="h5" color={"primary.text"}>
          Total de {count}
        </Typography>
        <Typography variant="subtitle1">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { data } = useDashboard();
  const { userInfo } = useAuth();

  return (
    <Card
      sx={{
        height: `calc(100vh - 150px)`,
        display: "flex",
        flexDirection: "column",
        width: { xs: "100%", lg: "80%" },
        margin: "auto",
        my: 2,
        overflow: "auto",
      }}
    >
      <CardHeader title={`Bem vindo(a), ${userInfo?.name}`} />

      <CardContent>
        <Typography variant="body1" color="text.secondary" paragraph>
          Visão geral das atividades pendentes no condomínio.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid container spacing={2} padding={4}>
            <Grid item xs={12} sm={12} md={6}>
              <DashboardCard
                title="Avisos Abertos"
                count={data?.warnings}
                icon={<Warning />}
                color="#f44336"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <DashboardCard
                title="Reservas Abertas"
                count={data?.reservations}
                icon={<Event />}
                color="#2196f3"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <DashboardCard
                title="Manutenções Abertas"
                count={data?.maintenances}
                icon={<Build />}
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <DashboardCard
                title="Enquetes Ativas"
                count={data?.survey}
                icon={<Poll />}
                color="#4caf50"
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
