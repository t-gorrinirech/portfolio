import json
import sys

from colorama import init
from termcolor import colored

init()


def format_arg(name, type_str):
    """Formatea el argumento: '<nombre|' en verde, 'tipo' en violeta, '>' en verde."""
    return f"{colored(f'<{name}|', 'green')}{colored(type_str, 'magenta')}{colored('>', 'green')}"


if __name__ == "__main__":
    if len(sys.argv) == 7:
        title, platform, difficulty, os_name, badges, link = sys.argv[1:7]

        badges_list = [badge.strip() for badge in badges.split(",")]

        machine = {
            "title": title,
            "platform": platform.upper(),
            "difficulty": difficulty.upper(),
            "os": os_name,
            "badges": badges_list,
            "link": link,
        }

        file_path = "machines.json"

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            data = []

        data.append(machine)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4)

        print(colored(f"\nÉxito: Máquina '{title}' guardada correctamente.", "cyan"))

    else:
        print(colored("Error: Se requieren exactamente 6 argumentos.", "red"))
        print(
            f"Uso correcto: python script.py "
            f"{format_arg('title', 'string')} "
            f"{format_arg('platform', 'string')} "
            f"{format_arg('difficulty', 'string')} "
            f"{format_arg('os', 'string')} "
            f"{format_arg('badges', 'string,string,string')} "
            f"{format_arg('link', 'string')}"
        )
