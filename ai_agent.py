#!/usr/bin/env python3
"""
ai_agent.py - Python Adaptive Reinforcement Learning & Trap Orchestrator for Devil's Trial
Implements online pattern recognition, player behavioral profiling, and progressive difficulty optimization.
Zero external dependencies (pure Python 3 standard library).
"""

import sys
import json
import math
import random
import os

MEMORY_FILE = os.path.join(os.path.dirname(__file__), 'ai_memory.json')

DEFAULT_WEIGHTS = {
    "RUSHER": [0.55, -0.35, 0.25, 0.60, -0.15],
    "CAUTIOUS": [-0.50, 0.65, -0.30, -0.50, 0.35],
    "HOPPER": [0.15, -0.15, 0.85, 0.20, -0.10],
    "CHAOTIC": [0.30, 0.25, 0.40, 0.10, 0.50],
    "METHODICAL": [-0.30, 0.35, -0.15, 0.40, -0.40]
}

DEFAULT_EFFICACY = {
    "collapsing_floor": 1.0,
    "piston_crusher": 1.0,
    "rolling_ball": 1.0,
    "hidden_spike": 1.0,
    "dropping_spike": 1.0,
    "spinning_saw": 1.0,
    "moving_platform": 1.0,
    "spring_pad": 1.0,
    "troll_portal": 1.0,
    "sliding_door": 1.0
}

class DevilPythonAI:
    def __init__(self):
        self.weights = {k: list(v) for k, v in DEFAULT_WEIGHTS.items()}
        self.trap_efficacy = dict(DEFAULT_EFFICACY)
        self.learning_epochs = 0
        self.player_skill = 1.0  # 1.0 (Beginner) -> 3.0 (Master)
        self.creativity_level = 1.0
        self.learning_rate = 0.08
        self.death_history = []
        self.clear_history = []
        self.load_memory()

    def load_memory(self):
        if os.path.exists(MEMORY_FILE):
            try:
                with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    if 'weights' in data:
                        self.weights = data['weights']
                    if 'trap_efficacy' in data:
                        self.trap_efficacy = data['trap_efficacy']
                    if 'learning_epochs' in data:
                        self.learning_epochs = data['learning_epochs']
                    if 'player_skill' in data:
                        self.player_skill = data['player_skill']
                    if 'creativity_level' in data:
                        self.creativity_level = data['creativity_level']
            except Exception:
                pass

    def save_memory(self):
        try:
            data = {
                'weights': self.weights,
                'trap_efficacy': self.trap_efficacy,
                'learning_epochs': self.learning_epochs,
                'player_skill': self.player_skill,
                'creativity_level': self.creativity_level,
                'total_deaths_recorded': len(self.death_history)
            }
            with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
        except Exception:
            pass

    def extract_features(self, telemetry):
        total_frames = max(1, telemetry.get('totalFrames', 60))
        moving_frames = telemetry.get('movingFrames', 0)
        idle_frames = telemetry.get('idleFrames', 0)
        jump_count = telemetry.get('jumpCount', 0)
        rush_dist = telemetry.get('rushDistance', 0)
        duration_sec = max(1.0, total_frames / 60.0)

        moving_ratio = moving_frames / total_frames
        idle_ratio = idle_frames / total_frames
        rush_rate = rush_dist / total_frames
        jumps_per_sec = jump_count / duration_sec
        death_count = len(telemetry.get('deaths', []))

        # Normalized feature vector:
        # [0]: rush score (-1.0 to 1.0)
        # [1]: hesitation score (-1.0 to 1.0)
        # [2]: jump frequency (-1.0 to 1.0)
        # [3]: reckless speed (-1.0 to 1.0)
        # [4]: instability / panic rate (-1.0 to 1.0)
        f0 = min(1.0, max(-1.0, rush_rate * 2.2 - 1.0))
        f1 = min(1.0, max(-1.0, idle_ratio * 2.2 - 1.0))
        f2 = min(1.0, max(-1.0, jumps_per_sec * 1.4 - 0.6))
        f3 = min(1.0, max(-1.0, (moving_ratio - 0.5) * 2.0))
        f4 = min(1.0, max(-1.0, (death_count / max(1.0, duration_sec / 30.0)) - 0.5))

        return [f0, f1, f2, f3, f4]

    def classify(self, telemetry):
        features = self.extract_features(telemetry)
        scores = {}
        for profile, w in self.weights.items():
            dot = sum(features[i] * w[i] for i in range(len(features)))
            scores[profile] = dot

        # Softmax probabilities
        exp_scores = {p: math.exp(min(15.0, max(-15.0, s))) for p, s in scores.items()}
        sum_exp = sum(exp_scores.values()) or 1.0
        probs = {p: exp_scores[p] / sum_exp for p in exp_scores}

        best_profile = max(probs.keys(), key=lambda p: probs[p])
        confidence = int(round(probs[best_profile] * 100))

        # Action probabilities for micro-decisions
        p_jump = min(0.95, max(0.05, 0.25 + features[2] * 0.45 + (0.2 if best_profile == "HOPPER" else 0.0)))
        p_rush = min(0.95, max(0.05, 0.35 + features[0] * 0.40 + (0.25 if best_profile == "RUSHER" else 0.0)))
        p_hesitate = min(0.95, max(0.05, 0.20 + features[1] * 0.50 + (0.3 if best_profile == "CAUTIOUS" else 0.0)))

        strategy_map = {
            "RUSHER": "Deploying early sinkholes, sudden crushers & boulder checkpoints into forward stride",
            "CAUTIOUS": "Deploying trailing boulders & rhythmic crushers to punish hesitation and force errors",
            "HOPPER": "Deploying airborne sawblades & dropping stalactites calibrated to apex jump arc",
            "CHAOTIC": "Deploying deceptive troll portals, fake spring pads & runaway exit doors",
            "METHODICAL": "Deploying synchronized multi-stage trap combos and shifting floor deception"
        }

        return {
            "profile": best_profile,
            "confidence": confidence,
            "probabilities": probs,
            "actionLikelihoods": {
                "jump": round(p_jump, 2),
                "rush": round(p_rush, 2),
                "hesitate": round(p_hesitate, 2)
            },
            "strategy": strategy_map.get(best_profile, "Adaptive hybrid hazard optimization")
        }

    def learn_death(self, event):
        fatal_trap = event.get('trapType') or event.get('reason')
        level_id = event.get('levelId', 1)

        if fatal_trap and fatal_trap in self.trap_efficacy:
            self.trap_efficacy[fatal_trap] = min(4.0, self.trap_efficacy[fatal_trap] + 0.30)

        # Perceptron online gradient update
        if fatal_trap in ('collapsing_floor', 'piston_crusher'):
            self.weights['RUSHER'][0] += self.learning_rate * 0.4
            self.weights['RUSHER'][3] += self.learning_rate * 0.4
        elif fatal_trap == 'rolling_ball':
            self.weights['CAUTIOUS'][1] += self.learning_rate * 0.45
        elif fatal_trap in ('dropping_spike', 'spinning_saw'):
            self.weights['HOPPER'][2] += self.learning_rate * 0.5

        self.learning_epochs += 1
        self.death_history.append(event)
        self.save_memory()

        return {
            "status": "learned",
            "epochs": self.learning_epochs,
            "trapEfficacy": self.trap_efficacy
        }

    def learn_clear(self, event):
        level_id = event.get('levelId', 1)
        bypassed_traps = event.get('deployedTraps', [])

        for t in bypassed_traps:
            if t in self.trap_efficacy:
                self.trap_efficacy[t] = max(0.45, self.trap_efficacy[t] * 0.90)

        self.player_skill = min(3.2, self.player_skill + 0.15)
        self.creativity_level = min(2.8, 1.0 + (level_id * 0.12) + (self.player_skill * 0.20))
        self.learning_epochs += 1
        self.clear_history.append(event)
        self.save_memory()

        return {
            "status": "adapted",
            "epochs": self.learning_epochs,
            "playerSkill": round(self.player_skill, 2),
            "creativity": round(self.creativity_level, 2)
        }

    def select_adaptive_traps(self, candidate_slots, static_traps, level_id, telemetry):
        if not candidate_slots:
            return {
                "selectedTraps": [],
                "difficultyMultiplier": 1.0,
                "maxTraps": 2,
                "classification": self.classify(telemetry or {})
            }

        classification = self.classify(telemetry or {})
        profile = classification['profile']

        # Progressive Difficulty Multiplier D(L)
        if level_id <= 1:
            diff_mult = 1.0
            max_traps = 2
        elif level_id == 2:
            diff_mult = 1.15
            max_traps = 2
        elif level_id == 3:
            diff_mult = 1.35
            max_traps = 3
        elif level_id == 4:
            diff_mult = 1.55
            max_traps = 3
        elif level_id == 5:
            diff_mult = 1.75
            max_traps = 4
        elif level_id == 6:
            diff_mult = 2.0
            max_traps = 5
        elif level_id == 7:
            diff_mult = 2.25
            max_traps = 6
        else:
            diff_mult = min(3.2, 2.25 + (level_id - 7) * 0.20)
            max_traps = min(8, 6 + (level_id - 7))

        active_traps = list(static_traps or [])

        # Score candidate slots
        scored = []
        for idx, raw_slot in enumerate(candidate_slots):
            slot = json.loads(json.dumps(raw_slot))
            t_type = slot.get('type')
            affinity = 1.0
            efficacy = self.trap_efficacy.get(t_type, 1.0)

            if profile == "RUSHER":
                if t_type in ('collapsing_floor', 'piston_crusher'):
                    affinity += 2.0
                elif t_type in ('rolling_ball', 'hidden_spike'):
                    affinity += 1.3
            elif profile == "CAUTIOUS":
                if t_type == 'rolling_ball':
                    affinity += 2.4
                elif t_type in ('piston_crusher', 'spinning_saw'):
                    affinity += 1.4
            elif profile == "HOPPER":
                if t_type == 'dropping_spike':
                    affinity += 2.6
                elif t_type in ('spinning_saw', 'hidden_spike'):
                    affinity += 1.5
            elif profile == "CHAOTIC":
                if t_type in ('troll_portal', 'sliding_door', 'spring_pad'):
                    affinity += 2.2
            elif profile == "METHODICAL":
                if t_type in ('collapsing_floor', 'piston_crusher', 'rolling_ball'):
                    affinity += 1.6

            # Zone variety weighting
            zone = slot.get('zone', 'mid')
            if zone == 'entry':
                affinity *= 1.1
            elif zone == 'exit':
                affinity *= 1.15

            score = (affinity * efficacy) * (0.80 + random.random() * 0.40)
            scored.append({
                'slot': slot,
                'idx': idx,
                'score': score
            })

        scored.sort(key=lambda s: s['score'], reverse=True)

        selected = []
        used_indices = set()

        # 60% ML predicted selection
        ml_budget = max(2, int(round(max_traps * 0.6)))
        for item in scored:
            if len(selected) >= ml_budget:
                break
            if self.is_safe(item['slot'], active_traps):
                selected.append(item['slot'])
                active_traps.append(item['slot'])
                used_indices.add(item['idx'])

        # 40% Wildcard surprise selection
        remaining = [s for s in scored if s['idx'] not in used_indices]
        random.shuffle(remaining)
        for item in remaining:
            if len(selected) >= max_traps:
                break
            if self.is_safe(item['slot'], active_traps):
                selected.append(item['slot'])
                active_traps.append(item['slot'])
                used_indices.add(item['idx'])

        # Fine-tune selected traps with progressive parameters
        tuned = []
        for trap in selected:
            t = json.loads(json.dumps(trap))
            # Modulate pause duration
            if 'pauseDuration' in t:
                t['pauseDuration'] = max(30, int(round(t['pauseDuration'] / min(1.3, diff_mult))))
            # Modulate trigger range with creative jitter
            if 'triggerRange' in t:
                jitter = random.randint(-4, 6)
                t['triggerRange'] = max(28, t['triggerRange'] + jitter)
            # Modulate speeds slightly for higher levels while staying readable
            if 'speed' in t and level_id >= 5:
                speed_scale = min(1.35, 1.0 + (level_id - 4) * 0.05)
                t['speed'] = round(t['speed'] * speed_scale, 2)
            if 'vx' in t and level_id >= 5:
                vx_scale = min(1.30, 1.0 + (level_id - 4) * 0.04)
                t['vx'] = round(t['vx'] * vx_scale, 2)

            tuned.append(t)

        return {
            "selectedTraps": tuned,
            "difficultyMultiplier": round(diff_mult, 2),
            "maxTraps": max_traps,
            "classification": classification
        }

    def is_safe(self, slot, active_list):
        """Semantic Anti-Checkmate Mutual Exclusion Filter."""
        if not slot or not active_list:
            return True

        s_type = slot.get('type')
        s_y = slot.get('groundY', slot.get('y', 345))
        s_x = slot.get('x', 0)
        s_w = slot.get('w', 32)

        for act in active_list:
            a_type = act.get('type')
            a_y = act.get('groundY', act.get('y', 345))
            a_x = act.get('x', 0)
            a_w = act.get('w', 28)

            same_elevation = abs(s_y - a_y) < 65

            # Never dual boulders on same corridor
            if s_type == 'rolling_ball' and a_type == 'rolling_ball' and same_elevation:
                return False

            # Boulder + low sawblade on same floor within rolling runway is impossible
            if ((s_type == 'rolling_ball' and a_type in ('spinning_saw', 'razor')) or
                (a_type == 'rolling_ball' and s_type in ('spinning_saw', 'razor'))) and same_elevation:
                if abs(s_x - a_x) < 220:
                    return False

            # Minimum physical gap between traps on the same elevation
            if same_elevation:
                gap = (s_x - (a_x + a_w)) if s_x >= a_x else (a_x - (s_x + s_w))
                min_gap = 35 if (s_type == 'static_spike' or a_type == 'static_spike') else 20
                if gap < min_gap:
                    return False

        return True


def run_cli():
    ai = DevilPythonAI()

    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == '--test':
            sample_telemetry = {
                'totalFrames': 360,
                'movingFrames': 300,
                'idleFrames': 60,
                'jumpCount': 12,
                'rushDistance': 1100,
                'deaths': [{'reason': 'hazard', 'trapType': 'piston_crusher'}]
            }
            sample_candidates = [
                {'type': 'collapsing_floor', 'x': 250, 'y': 345, 'w': 48, 'h': 35, 'zone': 'entry'},
                {'type': 'piston_crusher', 'x': 340, 'startY': 200, 'targetY': 240, 'w': 40, 'h': 105, 'zone': 'mid'},
                {'type': 'rolling_ball', 'x': 600, 'y': 345, 'groundY': 345, 'radius': 16, 'vx': -4.5, 'zone': 'mid'},
                {'type': 'dropping_spike', 'x': 450, 'y': 220, 'w': 22, 'h': 22, 'groundY': 345, 'zone': 'mid'},
                {'type': 'spinning_saw', 'x': 520, 'y': 315, 'radius': 15, 'patrolAxis': 'x', 'minX': 480, 'maxX': 560, 'speed': 2.0, 'zone': 'exit'}
            ]
            result = ai.select_adaptive_traps(sample_candidates, [], 6, sample_telemetry)
            print(json.dumps(result, indent=2))
            return

        if cmd == '--predict':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.select_adaptive_traps(
                payload.get('candidateSlots', []),
                payload.get('staticTraps', []),
                payload.get('levelId', 1),
                payload.get('telemetry', {})
            )
            print(json.dumps(res))
            return

        if cmd == '--learn-death':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.learn_death(payload)
            print(json.dumps(res))
            return

        if cmd == '--learn-clear':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.learn_clear(payload)
            print(json.dumps(res))
            return

        if cmd == '--classify':
            payload = json.loads(sys.argv[2] if len(sys.argv) > 2 else sys.stdin.read())
            res = ai.classify(payload)
            print(json.dumps(res))
            return

    # Default: read JSON from stdin
    try:
        raw = sys.stdin.read().strip()
        if raw:
            req = json.loads(raw)
            action = req.get('action', 'predict')
            if action == 'predict':
                res = ai.select_adaptive_traps(
                    req.get('candidateSlots', []),
                    req.get('staticTraps', []),
                    req.get('levelId', 1),
                    req.get('telemetry', {})
                )
                print(json.dumps(res))
            elif action == 'learn-death':
                print(json.dumps(ai.learn_death(req.get('event', {}))))
            elif action == 'learn-clear':
                print(json.dumps(ai.learn_clear(req.get('event', {}))))
            elif action == 'classify':
                print(json.dumps(ai.classify(req.get('telemetry', {}))))
            else:
                print(json.dumps({'error': 'Unknown action'}))
    except Exception as e:
        print(json.dumps({'error': str(e)}))

if __name__ == '__main__':
    run_cli()
