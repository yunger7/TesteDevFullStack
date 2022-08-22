import { useParams, Link } from "react-router-dom";

import {
	Container,
	Button,
	Box,
	Image,
	Title,
	Text,
	Paper,
	Badge,
	Group,
	SimpleGrid,
	Loader,
	Center,
	Indicator,
} from "@mantine/core";
import {
	TbChevronLeft as IconLeft,
	TbPokeball as IconPokeball,
	TbBarbell as IconWeight,
	TbLineHeight as IconHeight,
	TbCirclePlus as IconHealth,
	TbShoe as IconSpeed,
	TbShield as IconDefense,
	TbStar as IconSpAttack,
	TbStars as IconSpDefense,
	TbSword as IconAttack,
} from "react-icons/tb";

import { SubHeader } from "../components/SubHeader";
import { PokeStat } from "../components/PokeStat";
import { DeletePokemon } from "../components/DeletePokemon";
import { EditPokemon } from "../components/EditPokemon";
import { usePokemon } from "../hooks/usePokemon";
import { getPokemonTypeColor } from "../utils/getPokemonTypeColor";

export const Details = () => {
	let { id } = useParams();
	const { pokemon, loading, error } = usePokemon(id);

	return (
		<>
			<SubHeader title="Detalhes">
				<Group>
					<>
						<Button component={Link} to="/" leftIcon={<IconLeft size={18} />}>
							Voltar
						</Button>
						{pokemon && (
							<>
								<EditPokemon id={id} pokemon={pokemon} />
								<DeletePokemon id={id} />
							</>
						)}
					</>
				</Group>
			</SubHeader>
			<Container size="xl" py="xl" mt="xl">
				{loading ? (
					<Center sx={{ flexDirection: "column" }}>
						<Loader variant="bars" />
						<Text mt="md" color="dimmed" align="center">
							Buscando as informações...
						</Text>
					</Center>
				) : pokemon ? (
					<>
						<Group
							spacing={48}
							sx={theme => ({
								[theme.fn.smallerThan("md")]: {
									flexDirection: "column",
									alignItems: "stretch",
								},
							})}
						>
							<Indicator
								inline
								withBorder
								disabled={!pokemon.nature}
								label={pokemon.nature}
								size={24}
								offset={8}
								sx={{ fontWeight: 500, alignSelf: "center", zIndex: 1 }}
							>
								<Paper p="md" shadow="md">
									<Image
										withPlaceholder
										width={256}
										height={256}
										src={pokemon?.sprites.front_default}
										alt={pokemon?.name}
										placeholder={<Placeholder />}
										styles={{ placeholder: { minHeight: 256 } }}
									/>
								</Paper>
							</Indicator>
							<Box sx={{ flex: 1 }}>
								<Group
									spacing="xs"
									sx={theme => ({
										alignItems: "flex-end",

										[theme.fn.smallerThan("md")]: {
											flexDirection: "column",
											alignItems: "center",
										},
									})}
								>
									<Title>{pokemon.nickname}</Title>
									<Text color="dimmed">Level {pokemon.level || "???"}</Text>
								</Group>
								<Group
									mt="sm"
									spacing="xs"
									sx={theme => ({
										[theme.fn.smallerThan("md")]: {
											justifyContent: "center",
										},
									})}
								>
									{pokemon.types.map(type => (
										<Badge color={getPokemonTypeColor(type)} key={type}>
											{type}
										</Badge>
									))}
								</Group>
								<SimpleGrid
									cols={3}
									mt="xl"
									breakpoints={[
										{ maxWidth: "sm", cols: 2 },
										{ maxWidth: "xs", cols: 1 },
									]}
								>
									<PokeStat
										withColor
										name="Health"
										value={pokemon.hp}
										icon={IconHealth}
									/>
									<PokeStat
										withColor
										name="Attack"
										value={pokemon.attack}
										icon={IconAttack}
									/>
									<PokeStat
										withColor
										name="Defense"
										value={pokemon.defense}
										icon={IconDefense}
									/>
									<PokeStat
										withColor
										name="Sp. Attack"
										value={pokemon.sp_attack}
										icon={IconSpAttack}
									/>
									<PokeStat
										withColor
										name="Sp. Defense"
										value={pokemon.sp_defense}
										icon={IconSpDefense}
									/>
									<PokeStat
										withColor
										name="Speed"
										value={pokemon.speed}
										icon={IconSpeed}
									/>
								</SimpleGrid>
							</Box>
						</Group>
						<Box my="xl">
							<Title
								order={2}
								mb="lg"
								sx={theme => ({
									[theme.fn.smallerThan("md")]: {
										textAlign: "center",
									},
								})}
							>
								Estatísticas
							</Title>
							<SimpleGrid
								cols={4}
								breakpoints={[
									{ maxWidth: "md", cols: 3 },
									{ maxWidth: "sm", cols: 2 },
									{ maxWidth: "xs", cols: 1 },
								]}
							>
								<PokeStat
									name="Weight"
									value={`${pokemon.weight / 10} Kg`}
									icon={IconWeight}
								/>
								<PokeStat
									name="Height"
									value={`${pokemon.height / 10} m`}
									icon={IconHeight}
								/>
								<PokeStat
									name="Health"
									value={pokemon.stats["hp"].value}
									icon={IconHealth}
								/>
								<PokeStat
									name="Attack"
									value={pokemon.stats["attack"].value}
									icon={IconAttack}
								/>
								<PokeStat
									name="Defense"
									value={pokemon.stats["defense"].value}
									icon={IconDefense}
								/>
								<PokeStat
									name="Sp. Attack"
									value={pokemon.stats["special-attack"].value}
									icon={IconSpAttack}
								/>
								<PokeStat
									name="Sp. Defense"
									value={pokemon.stats["special-defense"].value}
									icon={IconSpDefense}
								/>
								<PokeStat
									name="Speed"
									value={pokemon.stats["speed"].value}
									icon={IconSpeed}
								/>
							</SimpleGrid>
						</Box>
						<Box my="xl">
							<Title
								order={2}
								mb="lg"
								sx={theme => ({
									[theme.fn.smallerThan("md")]: {
										textAlign: "center",
									},
								})}
							>
								Aparência
							</Title>
							<SimpleGrid
								cols={4}
								breakpoints={[
									{ maxWidth: "md", cols: 3 },
									{ maxWidth: "sm", cols: 2 },
									{ maxWidth: "xs", cols: 1 },
								]}
							>
								<Image
									withPlaceholder
									fit="contain"
									src={pokemon?.sprites.front_default}
									alt={pokemon?.name}
									caption="Frente (comum)"
									placeholder={<Placeholder />}
									styles={{
										placeholder: { minHeight: 300 },
										image: { maxHeight: 256 },
									}}
								/>
								<Image
									withPlaceholder
									fit="contain"
									src={pokemon?.sprites.back_default}
									alt={pokemon?.name}
									caption="Traseira (comum)"
									placeholder={<Placeholder />}
									styles={{
										placeholder: { minHeight: 300 },
										image: { maxHeight: 256 },
									}}
								/>
								<Image
									withPlaceholder
									fit="contain"
									src={pokemon?.sprites.front_shiny}
									alt={pokemon?.name}
									caption="Traseira (shiny)"
									placeholder={<Placeholder />}
									styles={{
										placeholder: { minHeight: 300 },
										image: { maxHeight: 256 },
									}}
								/>
								<Image
									withPlaceholder
									fit="contain"
									src={pokemon?.sprites.back_shiny}
									alt={pokemon?.name}
									caption="Traseira (shiny)"
									placeholder={<Placeholder />}
									styles={{
										placeholder: { minHeight: 300 },
										image: { maxHeight: 256 },
									}}
								/>
							</SimpleGrid>
						</Box>
					</>
				) : (
					<>
						{error && (
							<Center>
								<Text color="dimmed" align="center">
									{"(╯°□°）╯︵ ┻━┻"}
									<br />
									Wops! Não foi possível buscar seu pokémon
								</Text>
							</Center>
						)}
					</>
				)}
			</Container>
		</>
	);
};

const Placeholder = () => {
	return (
		<Center sx={{ flexDirection: "column" }}>
			<IconPokeball size={64} />
			<Text align="center">Imagem não encontrada</Text>
		</Center>
	);
};
