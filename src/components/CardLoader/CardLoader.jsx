import {
    SCardLoaderItem,
    SCardLoaderCard,
    SCardLoaderGroup,
    SCardLoaderTheme,
    SCardLoaderBtn,
    SCardLoaderContent,
    SCardLoaderTitle,
    SCardLoaderDate,
} from "./CardLoader.styled";

export default function CardLoader() {
    return (
        <SCardLoaderItem>
            <SCardLoaderCard>
                <SCardLoaderGroup>
                    <SCardLoaderTheme />
                    <SCardLoaderBtn />
                </SCardLoaderGroup>

                <SCardLoaderContent>
                    <SCardLoaderTitle />
                    <SCardLoaderDate />
                </SCardLoaderContent>
            </SCardLoaderCard>
        </SCardLoaderItem>
    );
}
