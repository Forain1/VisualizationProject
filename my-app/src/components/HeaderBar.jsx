import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Box from "@mui/material/Box";

const HeaderBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#0f172a', // 深蓝色
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        borderRadius: '0 0 12px 12px',
        paddingX: 2,
      }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            paddingX: 2,
          }}
        >
          <DashboardIcon sx={{ fontSize: 28, color: '#38bdf8' }} />
          <Box>
            <Typography variant="h6" sx={{ color: '#f1f5f9' }}>
              可视化仪表盘:健身房会员数据分析
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Visualization Dashboard
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
