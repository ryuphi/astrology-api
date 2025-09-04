const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
app.get('/health', (req,res)=>res.status(200).send('ok'));
app.listen(PORT, HOST, () => console.log(`API on ${PORT}`));
