import createEmotionCache from "@/createEmotionCache";
import {EmotionCache} from "@emotion/utils";
import {AppProps} from "next/app";
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "@/theme";
import Head from "next/head";
import {CacheProvider} from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import ScrollTop from "@/components/ScrollTop";
import {AuthContextProvider} from "@/context/AuthContext";
import Link from "next/link";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    return (
        <AuthContextProvider>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    <AppBar elevation={0} color={'secondary'}>
                        <Toolbar>
                            <Container>
                                <Typography variant="h4" component="div">
                                    <Link href={'/'} style={{color: '#fff', textDecoration: 'none'}}>NextJS+MUI</Link>
                                </Typography>
                            </Container>
                        </Toolbar>
                    </AppBar>
                    <Toolbar id="back-to-top-anchor"/>
                    <Container sx={{mt: 2}}>
                        <Component {...pageProps} />
                    </Container>
                    <ScrollTop {...props}>
                        <Fab size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon/>
                        </Fab>
                    </ScrollTop>
                </ThemeProvider>
            </CacheProvider>
        </AuthContextProvider>
    );
}