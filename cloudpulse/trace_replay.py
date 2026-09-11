import pandas as pd

class TraceReplay:
    """Loads a CSV trace and provides sequential rows for telemetry replay."""
    def __init__(self, csv_path: str):
        # CSVs can be comma, semicolon, or tab separated
        try:
            self.df = pd.read_csv(csv_path, sep='[;,\t]', engine='python')
        except Exception:
            self.df = pd.read_csv(csv_path)
            
        # Normalise column names to lower case without spaces
        self.df.columns = [str(c).strip().lower() for c in self.df.columns]
        
        # Convert numeric columns safely, dropping invalid rows (e.g. repeated header lines)
        for col in ['cpu', 'cpu_percent', 'network', 'network_bytes', 'sockets', 'open_sockets', 'iops', 'memory']:
            if col in self.df.columns:
                self.df[col] = pd.to_numeric(self.df[col], errors='coerce')
        
        # Drop rows where cpu is NaN (non-numeric rows like repeated headers)
        cpu_col = 'cpu' if 'cpu' in self.df.columns else ('cpu_percent' if 'cpu_percent' in self.df.columns else None)
        if cpu_col:
            self.df = self.df.dropna(subset=[cpu_col]).reset_index(drop=True)
            
        self.index = 0
        self.total = len(self.df)

    def next_row(self) -> dict:
        if self.total == 0:
            return {
                "cpu_percent": 0.0,
                "network_bytes": 0.0,
                "open_sockets": 0,
                "iops": 0.0,
                "memory": 0.0,
                "timestamp": pd.Timestamp.now().timestamp(),
            }
        row = self.df.iloc[self.index]
        self.index = (self.index + 1) % self.total
        
        def safe_float(val, default=0.0):
            try:
                v = float(val)
                return v if not pd.isna(v) else default
            except (ValueError, TypeError):
                return default

        def safe_int(val, default=0):
            try:
                v = int(float(val))
                return v if not pd.isna(v) else default
            except (ValueError, TypeError):
                return default

        cpu = safe_float(row.get('cpu', row.get('cpu_percent', 0)))
        net = safe_float(row.get('network', row.get('network_bytes', 0)))
        sock = safe_int(row.get('sockets', row.get('open_sockets', 0)))
        iops = safe_float(row.get('iops', 0))
        mem = safe_float(row.get('memory', 0))

        telemetry = {
            "cpu_percent": round(cpu, 2),
            "network_bytes": round(net, 2),
            "open_sockets": sock,
            "iops": round(iops, 2),
            "memory": round(mem, 2),
            "timestamp": pd.Timestamp.now().timestamp(),
        }
        return telemetry
