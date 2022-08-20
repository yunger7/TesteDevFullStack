import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
	Title,
	Text,
	Button,
	Grid,
	Stack,
	Container,
	Anchor,
	createStyles,
} from "@mantine/core";
import { BsGoogle as IconGoogle } from "react-icons/bs";
import { TbPokeball as IconPokeball } from "react-icons/tb";

import { PokeShowcase } from "../components/PokeShowcase";
import { auth } from "../services/firebase";

import Articuno from "../assets/articuno.png";
import Charmander from "../assets/charmander.png";
import Ditto from "../assets/ditto.png";
import Mew from "../assets/mew.png";
import Pikachu from "../assets/pikachu.png";
import Eevee from "../assets/eevee.png";
import Nidoking from "../assets/nidoking.png";
import Gengar from "../assets/gengar.png";

const useStyles = createStyles(theme => ({
	main: {
		[theme.fn.smallerThan("xs")]: {
			marginTop: theme.spacing.xl,
			marginBottom: theme.spacing.xl,
		},
	},

	item: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	right: {
		[theme.fn.smallerThan("xs")]: {
			justifyContent: "right",
		},
	},

	left: {
		[theme.fn.smallerThan("xs")]: {
			justifyContent: "left",
		},
	},
}));

const GoogleProvider = new GoogleAuthProvider();

export const Landing = () => {
	const navigate = useNavigate();
	const { classes, cx } = useStyles();

	async function signInWithGoogle() {
		const credentials = await signInWithPopup(auth, GoogleProvider);

		if (credentials) {
			navigate("/");
		}
	}

	return (
		<Container size="xl" sx={{ height: "100%" }}>
			<Grid align="center" sx={{ height: "100%" }}>
				<Grid.Col className={cx(classes.item, classes.right)} xs={3} md={4}>
					<PokeShowcase pokemon={Nidoking} size="large" />
				</Grid.Col>
				<Grid.Col className={classes.item} xs={3} md={4}>
					<PokeShowcase pokemon={Eevee} size="small" />
				</Grid.Col>
				<Grid.Col className={cx(classes.item, classes.left)} xs={3} md={4}>
					<PokeShowcase pokemon={Gengar} />
				</Grid.Col>
				<Grid.Col className={classes.item} xs={3} md={2}>
					<PokeShowcase pokemon={Mew} size="small" />
				</Grid.Col>
				<Grid.Col className={classes.main} xs={12} md={8}>
					<Stack align="center" justify="center">
						<IconPokeball size={64} />
						<Title order={1} align="center">
							Capturou um Pokémon? Registre-o!
						</Title>
						<Text align="center" sx={{ maxWidth: 650 }}>
							Este site é o resultado de um teste proposto pela{" "}
							<Anchor href="https://teppadev.com.br/" target="_blank">
								Teppa
							</Anchor>{" "}
							e realizado por{" "}
							<Anchor href="https://luisgalete.com.br/" target="_blank">
								Luís Galete
							</Anchor>
							. O projeto é{" "}
							<Anchor
								href="https://github.com/yunger7/TesteDevFullStack"
								target="_blank"
							>
								open-source
							</Anchor>{" "}
							e pode ser encontrado no GitHub {":)"}
						</Text>
						<Button
							color="orange"
							mt="xs"
							leftIcon={<IconGoogle size={18} />}
							onClick={signInWithGoogle}
						>
							Entrar com Google
						</Button>
					</Stack>
				</Grid.Col>
				<Grid.Col className={classes.item} xs={3} md={2}>
					<PokeShowcase pokemon={Ditto} size="small" />
				</Grid.Col>
				<Grid.Col className={cx(classes.item, classes.right)} xs={3} md={4}>
					<PokeShowcase pokemon={Pikachu} />
				</Grid.Col>
				<Grid.Col className={classes.item} xs={3} md={4}>
					<PokeShowcase pokemon={Charmander} size="small" />
				</Grid.Col>
				<Grid.Col className={cx(classes.item, classes.left)} xs={3} md={4}>
					<PokeShowcase pokemon={Articuno} size="large" />
				</Grid.Col>
			</Grid>
		</Container>
	);
};
