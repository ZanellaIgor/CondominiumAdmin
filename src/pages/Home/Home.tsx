import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  return (
    <Container>
      <Card>
        <CardHeader title="Home" />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography variant="h1">Conteúdo Inicial</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
