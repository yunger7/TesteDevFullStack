import {
	Modal,
	TextInput,
	NumberInput,
	Group,
	Button,
	Image,
	Stack,
	Select,
	SimpleGrid,
} from "@mantine/core";
import { TbPokeball as IconPokeball } from "react-icons/tb";

import { POKEMON_NATURES } from "../../utils/PokemonNatures";

import type { UseFormReturnType } from "@mantine/form";
import type { Pokemon, PokemonInfo } from "./types";

type PokemonInfoModalProps = {
	opened: boolean;
	onClose: () => void;
	onButtonCancel: () => void;
	onButtonConfirm: () => void;
	pokemon?: Pokemon;
	form: UseFormReturnType<PokemonInfo>;
};

export const PokemonInfoModal = (props: PokemonInfoModalProps) => {
	const { opened, onClose, onButtonConfirm, onButtonCancel, pokemon, form } =
		props;

	return (
		<Modal
			centered
			size="lg"
			transition="slide-up"
			transitionDuration={500}
			overlayOpacity={0.35}
			title="Dados do pokémon"
			closeButtonLabel="Fechar"
			opened={opened}
			onClose={onClose}
		>
			<Group
				sx={theme => ({
					[theme.fn.smallerThan("sm")]: { flexDirection: "column" },
				})}
			>
				<Image
					withPlaceholder
					width={128}
					height={128}
					src={pokemon?.sprites.front_default}
					alt={pokemon?.name}
					placeholder={<IconPokeball size={64} />}
				/>
				<Stack sx={{ flex: 1 }}>
					<TextInput
						data-autofocus
						withAsterisk
						label="Apelido"
						{...form.getInputProps("nickname")}
					/>
					<Group grow>
						<NumberInput
							label="Level"
							min={1}
							max={100}
							{...form.getInputProps("level")}
						/>
						<Select
							label="Natureza"
							data={POKEMON_NATURES}
							{...form.getInputProps("nature")}
						/>
					</Group>
				</Stack>
			</Group>
			<SimpleGrid
				cols={6}
				mt="xl"
				breakpoints={[
					{ maxWidth: "sm", cols: 3 },
					{ maxWidth: "xs", cols: 2 },
				]}
			>
				<NumberInput
					hideControls
					size="xs"
					min={0}
					label="HP"
					{...form.getInputProps("hp")}
				/>
				<NumberInput
					hideControls
					size="xs"
					min={0}
					label="Attack"
					{...form.getInputProps("attack")}
				/>
				<NumberInput
					hideControls
					size="xs"
					min={0}
					label="Defense"
					{...form.getInputProps("defense")}
				/>
				<NumberInput
					hideControls
					size="xs"
					min={0}
					label="Sp. Attack"
					{...form.getInputProps("sp_attack")}
				/>
				<NumberInput
					hideControls
					size="xs"
					min={0}
					label="Sp. Defense"
					{...form.getInputProps("sp_defense")}
				/>
				<NumberInput
					hideControls
					size="xs"
					min={0}
					label="Speed"
					{...form.getInputProps("speed")}
				/>
			</SimpleGrid>
			<Group position="right" mt="lg">
				<Button variant="default" onClick={onButtonCancel}>
					Voltar
				</Button>
				<Button onClick={onButtonConfirm}>Continuar</Button>
			</Group>
		</Modal>
	);
};
